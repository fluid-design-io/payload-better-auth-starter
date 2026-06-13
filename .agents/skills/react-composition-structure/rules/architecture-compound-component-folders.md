---
title: Use Compound Component Folders for Shared Multi-Part UI
slug: architecture-compound-component-folders
group: Component Folders
groupNumber: 1
section: "1.1"
impact: HIGH
tags: file-organization, compound-components, state-sharing
---

## Use Compound Component Folders for Shared Multi-Part UI

Use a compound component folder when a shared component has:

- multiple named subparts consumers compose directly
- shared state needed by several sibling leaves
- variants that would otherwise turn into boolean props

Keep leaf components flat when they are small and presentational. Foldering is a
response to real complexity, not a default ceremony.

**Bad: one monolithic component plus sibling exports**

```text
components/
  Composer.tsx
  ComposerHeader.tsx
  ComposerFooter.tsx
  ComposerInput.tsx
  ComposerActions.tsx
  useComposerState.ts
```

Problems:

- the public API is a bag of related files
- shared state tends to leak through props or ad hoc hooks
- consumers must know too many implementation names

**Good: one folder with one public namespace**

```text
composer/
  composer.tsx
  composer.context.tsx
  composer.display.tsx
  composer.actions.tsx
  composer.types.ts
  index.ts
```

The folder mirrors the composition model:

- `composer.tsx` assembles the namespace
- `composer.context.tsx` owns state-sharing boundaries
- `composer.display.tsx` owns read-oriented leaves
- `composer.actions.tsx` owns interactive leaves
- `composer.types.ts` owns the context contract
- `index.ts` owns the public boundary

**Bad: UI coupled to one specific state hook**

```tsx
function ComposerInput() {
  const { input, setInput } = useChannelComposerState()
  return <TextInput value={input} onChangeText={setInput} />
}
```

This traps the UI inside one implementation.

**Good: provider-led state sharing through a stable contract**

```tsx
type ComposerState = {
  input: string
  attachments: Attachment[]
}

type ComposerActions = {
  updateInput: (value: string) => void
  submit: () => void
}

type ComposerMeta = {
  inputRef: React.RefObject<TextInput>
}

type ComposerContextValue = {
  state: ComposerState
  actions: ComposerActions
  meta: ComposerMeta
}
```

```tsx
const ComposerContext = createContext<ComposerContextValue | null>(null)

function ComposerProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: ComposerContextValue
}) {
  return <ComposerContext value={value}>{children}</ComposerContext>
}

function ComposerInput() {
  const {
    state,
    actions: { updateInput },
    meta: { inputRef },
  } = use(ComposerContext)

  return (
    <TextInput
      ref={inputRef}
      value={state.input}
      onChangeText={updateInput}
    />
  )
}
```

This is the important file-system implication:

- put the context contract in `composer.types.ts`
- put provider wiring in `composer.context.tsx`
- let display and action leaves consume the interface rather than own state

**Sharing state outside the visible frame**

State sharing is a provider concern, not a visual nesting concern.
Components outside the main frame can still read or mutate state if they live
inside the provider boundary.

```tsx
function ForwardMessageDialog() {
  return (
    <Composer.Provider value={value}>
      <Dialog>
        <Composer.Frame>
          <Composer.Input />
          <Composer.Footer>
            <Composer.Submit />
          </Composer.Footer>
        </Composer.Frame>

        <MessagePreview />
        <DialogActions>
          <ForwardButton />
        </DialogActions>
      </Dialog>
    </Composer.Provider>
  )
}
```

This is why context ownership belongs in the component-folder rule: it defines
how shared UI folders map composition and state sharing into files.

A module may own both a shared compound namespace and route-bound screens
when the shared surface genuinely belongs to the same domain. Keep the compound
namespace narrow (leaves only — no screens) and expose screens as top-level
exports per `architecture-route-bound-module-folders.md`.

**Checklist**

- Is the component truly shared or multi-part?
- Are several leaves reading the same state?
- Would booleans or render props otherwise proliferate?
- Does the folder expose one root namespace?
- Is provider wiring isolated from leaf rendering?

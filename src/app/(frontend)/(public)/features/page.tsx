import image from "public/website-template-OG.png";
import {
  FullWidthImage,
  ImageMedia,
  LayoutHeader,
  SectionGrid,
  SectionGridItem,
  SectionHeader,
  SectionHorizontal,
  SectionSpacing,
} from "@/components/layout/elements";
import { Main } from "@/components/layout/main";

export default function FeaturesPage() {
  return (
    <Main>
      <LayoutHeader
        title='Features'
        badge='Acme'
        description='Vix cu falli fabulas feugait, mel ea aliquip mentitum elaboraret, ius id audire salutatus. Cum dicat praesent dignissim ne. Novum labitur blandit no mea. Quas omittantur te sit, ei his praesent electram eloquentiam.'
      />
      <SectionSpacing>
        <SectionGrid>
          <SectionGridItem
            title='Title 1'
            description='Apeirian suavitate vim ut, has tota mundi efficiantur id. Dicunt imperdiet his ex. Pri veri zril ex, ea qualisque efficiendi nec. Libris omittam suscipit id duo, ei natum animal scriptorem vim.'
            media={<ImageMedia src={image} alt='Title 1' />}
          />
          <SectionGridItem
            title='Title 2'
            description='Denique interpretaris eos ei. Illud ignota dissentiet no sed, movet semper volumus ne vis. Eum cu interesset temporibus, ne impedit explicari usu, vocent gubergren his no. Eum nulla error abhorreant ne, mucius platonem dissentiunt eu est.'
            media={<ImageMedia src={image} alt='Title 2' />}
          />
        </SectionGrid>
        <FullWidthImage image={image} caption='Image Caption' alt='Title 1' />
        <SectionHeader
          title='Section Header'
          badge='Section'
          description='Cum dicat praesent dignissim ne. Novum labitur blandit no mea. Quas omittantur te sit, ei his praesent electram eloquentiam. Apeirian suavitate vim ut, has tota mundi efficiantur id. Dicunt imperdiet his ex. Pri veri zril ex, ea qualisque efficiendi nec.'
        />
        <SectionHorizontal
          variant='left'
          title='Title 3'
          description='Timeam menandri ius ex, cum ei omnis scribentur. Mentitum scripserit ullamcorper vis an. Nam ei putant diceret posidonium, cu eum nulla omnium euripidis, ad sanctus vivendo recusabo sit. Cum cu consul epicurei, aeterno probatus et mel. Vim omnis sanctus detracto ut.'
          media={
            <ImageMedia
              src={image}
              alt='Title 3'
              className='p-8'
              imgClassName='rounded-2xl'
              gradientColors={[
                "from-purple-200/20",
                "via-purple-300/20",
                "to-purple-500/20",
              ]}
            />
          }
        />
        <SectionHorizontal
          variant='right'
          title='Title 4'
          description='Has ne habeo augue dicta, eu soluta viderer ius. Sea ex quod volumus persequeris. Duo eu homero sanctus, sit cu dolore populo tibique. Quod posse decore per no, ut assum mucius definiebas eos. Eum id alia fierent, eu duo porro albucius, per commune argumentum appellantur te.'
          media={
            <ImageMedia
              src={image}
              alt='Title 4'
              className='p-8'
              imgClassName='rounded-2xl'
              gradientColors={[
                "from-cyan-200/20",
                "via-cyan-300/20",
                "to-cyan-500/20",
              ]}
            />
          }
        />
      </SectionSpacing>
    </Main>
  );
}

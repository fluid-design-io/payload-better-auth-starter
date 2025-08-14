import { Database, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Services = () => {
  return (
    <Card variant='mixed' className='max-w-md backdrop-blur-xs'>
      <CardHeader>
        <CardTitle>Development Services</CardTitle>
        <CardDescription>
          Access your development tools and services
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-3'>
        <Button
          variant='outline'
          className='flex justify-start items-center'
          asChild
        >
          <Link href='http://localhost:9000' target='_blank'>
            <Mail />
            Inbucket Email UI
          </Link>
        </Button>

        <Button
          variant='outline'
          className='flex justify-start items-center'
          asChild
        >
          <Link href='http://localhost:9002' target='_blank'>
            <Database />
            MinIO S3 Console
          </Link>
        </Button>
        <Button
          variant='outline'
          className='flex justify-start items-center'
          // @see https://github.com/payloadcms/payload/pull/13157
          disabled
        >
          <svg
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
          >
            <title>Drizzle Studio</title>
            <path
              d='M5.353 11.823a1.036 1.036 0 0 0 -0.395 -1.422 1.063 1.063 0 0 0 -1.437 0.399L0.138 16.702a1.035 1.035 0 0 0 0.395 1.422 1.063 1.063 0 0 0 1.437 -0.398l3.383 -5.903Zm11.216 0a1.036 1.036 0 0 0 -0.394 -1.422 1.064 1.064 0 0 0 -1.438 0.399l-3.382 5.902a1.036 1.036 0 0 0 0.394 1.422c0.506 0.283 1.15 0.104 1.438 -0.398l3.382 -5.903Zm7.293 -4.525a1.036 1.036 0 0 0 -0.395 -1.422 1.062 1.062 0 0 0 -1.437 0.399l-3.383 5.902a1.036 1.036 0 0 0 0.395 1.422 1.063 1.063 0 0 0 1.437 -0.399l3.383 -5.902Zm-11.219 0a1.035 1.035 0 0 0 -0.394 -1.422 1.064 1.064 0 0 0 -1.438 0.398l-3.382 5.903a1.036 1.036 0 0 0 0.394 1.422c0.506 0.282 1.15 0.104 1.438 -0.399l3.382 -5.902Z'
              fill='currentColor'
              strokeWidth={1}
            />
          </svg>
          Drizzle Studio (coming soon)
        </Button>
      </CardContent>
    </Card>
  );
};

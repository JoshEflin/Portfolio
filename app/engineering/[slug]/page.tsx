import { Terminal } from '@/components/terminal/terminal/Terminal';

export default function Page({ params }: { params: { slug: string } }) {
    console.log(params)
    return <Terminal />
}

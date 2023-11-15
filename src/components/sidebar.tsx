import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { Link } from './link'

export function Sidebar() {
  return (
    <div className="fixed flex h-full flex-col items-center justify-between bg-blue-400 px-6 py-8">
      <Image src="/local.svg" width={48} height={56} alt="" />

      <Link
        href="/location"
        className="h-12 w-12 bg-blue-600 hover:bg-blue-300"
      >
        <ArrowLeft className="h-6 w-6 stroke-2 text-white" />
      </Link>
    </div>
  )
}

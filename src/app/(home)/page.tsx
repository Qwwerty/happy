'use client'

import { useMobile } from '@/hooks/useMobile'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const isMobile = useMobile()

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-t from-happy-blue-500 to-happy-cyan-400 px-6 sm:px-20 lg:px-10">
      <div className="relative flex w-full max-w-app justify-between">
        <div>
          <Image
            src="/logo.png"
            width={240}
            height={74}
            alt="Happy"
            quality={100}
            className="w-[120px] object-cover md:h-[74px] md:w-[240px]"
          />

          <Image
            src="/take-happiness.svg"
            width={394}
            height={290}
            alt="Leve felicidade para o mundo"
            className="mt-28 w-[190px] object-cover sm:w-[290px] xl:h-[290px] xl:w-[394px]"
          />

          <span className="mt-10 block w-40 text-lg text-white sm:w-80 sm:text-2xl">
            Visite orfanatos e mude o dia de muitas crianças.
          </span>
        </div>

        <Image
          src="/children.svg"
          width={553}
          height={673}
          alt=""
          className="hidden lg:flex lg:h-[573px] lg:w-[453px] xl:h-[673px] xl:w-[553px]"
        />

        <div className="flex flex-col items-end justify-between">
          <p className="flex flex-col text-end text-lg font-extrabold text-white sm:text-2xl">
            Ubá
            <span className="text-lg font-semibold text-white sm:text-2xl">
              Minas Gerais
            </span>
          </p>

          <Link
            href="/"
            className="group flex h-16 w-16 items-center justify-center rounded-[1.875rem] bg-happy-yellow transition-colors hover:bg-happy-blue-100 sm:h-20 sm:w-20"
          >
            <ArrowRight className="stroke- h-8 w-8 font-extrabold text-happy-brown group-hover:text-happy-blue-300 group-hover:transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  )
}

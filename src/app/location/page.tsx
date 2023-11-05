import Image from 'next/image'

export default function Location() {
  return (
    <div className="grid-cols-location grid h-screen">
      <div className="flex h-full flex-col justify-between bg-gradient-to-t from-blue-500 to-cyan-400 py-20 pl-28 pr-20 pt-20">
        <div className="flex flex-col gap-20">
          <Image src="/local.svg" width={64} height={72} quality={100} alt="" />

          <p className="flex flex-col gap-6 text-4xl font-extrabold text-white">
            Escolha um orfanato no mapa
            <span className="text-lg font-semibold text-white">
              Muitas crianças estão esperando a sua visita :)
            </span>
          </p>
        </div>

        <p className="flex flex-col text-lg font-extrabold text-white">
          Ubá
          <span className="text-lg font-semibold text-white">Minas Gerais</span>
        </p>
      </div>
    </div>
  )
}

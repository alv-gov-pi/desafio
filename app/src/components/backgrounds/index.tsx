import Image from 'next/image'
function BackgroundLadoEsquerdo() {
  return (
    <div className='mr-10 w-8/12'>
      <Image src="/image/login.png"
        alt="imagem de uma pessoa usando notebook"
        width={200} height={800}
        className="h-screen w-3/6"
      />
    </div>
  );
}

export default BackgroundLadoEsquerdo;
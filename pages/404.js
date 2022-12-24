import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="grid grid-cols-2 h-[calc(100vh-80px)] overflow-hidden bg-[#f4f6fc]">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-5xl m-5">
          Sorry, We are unable to load this page! :(
        </h1>
        <Link href="/">Please Click here to return on homepage</Link>
      </div>
      <div className="flex justify-center items-center">
        <img className="bg-slate-200" src="/images/error/404.jpg" />
      </div>
    </div>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-light">Core Support Hub Color Palletes</h1>
    <div className="flex">
    <div className="bg-primary w-40 h-40 flex flex-col items-center justify-center">
      <p>Primary:</p>
      <p> #1a1a1a</p>
     </div>
     <div className="bg-secondary w-40 h-40 flex flex-col items-center justify-center">
     <p>Secondary: </p>
     <p>#333333</p>
     </div>
     <div className="bg-tertiary w-40 h-40 flex flex-col items-center justify-center">
     <p>Tertiary: </p>
     <p>#4d4d4d</p>
     </div>
     <div className="bg-accent w-40 h-40 flex flex-col items-center justify-center">
     <p>Accent: </p>
     <p>#ff6b3b</p>
     </div>
     <div className="bg-light w-40 h-40 flex flex-col items-center justify-center">
     <p className="text-primary">Light: </p>
     <p className="text-primary">#f0f0f0</p>
     </div>
     <div className="bg-white w-40 h-40 flex flex-col items-center justify-center">
     <p className="text-primary">White: </p>
     <p className="text-primary">#ffffff</p>
     </div>
    </div>
    </main>
  );
}

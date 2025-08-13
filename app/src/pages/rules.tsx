import Image from "next/image";
import logo from "../../public/Bulge.svg";
import Link from "next/link";

export default function Rules() {
  return (
    <div className="main">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={200}
          priority
          className="mt-4"
        />
      </Link>
      <div className="content">Work in progress... Check back later.</div>
    </div>
  )
}
import React from "react";
import Image from "next/image";
import logo from "../../public/bulge-bl-or.svg";
import Link from "next/link";

const Logo = () => {
  return (
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
  );
}

export default Logo;
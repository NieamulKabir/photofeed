import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image
          className="max-w-[100px] md:max-w-[165px]"
          src="/lws_logo.png"
          alt="LWS"
          height={100}
          width={100}
        />
      </Link>
    </div>
  );
};

export default Logo;

import logo from "../../public/Bulge (1).svg";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useEffect, useState } from "react";

export default function Registration() {

  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setPageHeight(window.document.body.offsetHeight);
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  return (
    <div className="main">
      <Image
        src={logo}
        alt="logo"
        width={200}
        height={200}
        priority
        className="mt-4"
      />

      <div className="content">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdOtc1KZHydaCZuBICnzazcXNFpq7zEkyIdW8WjYMqLHwm43A/viewform?embedded=true" width="100%" height="600">Loading…</iframe>
      </div>
    </div>
  );
}
import logo from "../../public/Bulge.svg";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Registration() {

  return (
    <div className="main">
      <Image
        src={logo}
        alt="logo"
        width={200}
        height={200}
        className="mt-4"
      />

      <div className="content">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdOtc1KZHydaCZuBICnzazcXNFpq7zEkyIdW8WjYMqLHwm43A/viewform?embedded=true" width="100%" height="600">Loading…</iframe>
      </div>
    </div>
  );
}
import logo from "../../public/Bulge.svg";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Registration() {

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json' // Specify content type as JSON
  //       },
  //       body: JSON.stringify({
  //         "owner": "Test 7",
  //         "email": "test5@yopmail.com",
  //         "players": [
  //           "Player 1", "Player 2", "Player 3", "Player 4","Player 5", "Player 6", "Player 7"
  //         ]
  //       })
  //     };

  //     const response = await fetch('/api/teams', requestOptions);
  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log('Post created successfully!');
  //       // Optionally, clear the form or update UI
  //       // setFormData({ title: '', content: '' });
  //     } else {
  //       console.log(`Error: ${data.message || 'Something went wrong'}`);
  //     }
  //   } catch (error) {
  //     console.error('Error making POST request:', error);

  //   }
  // };

  return (
    <div className="main">
      <Image
        src={logo}
        alt="logo"
        width={200}
        height={200}
        className="mt-4"
      />

      {/* <button onClick={handleSubmit}>Register</button> */}

      <div className="content">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdOtc1KZHydaCZuBICnzazcXNFpq7zEkyIdW8WjYMqLHwm43A/viewform?embedded=true" width="100%" height="600">Loading…</iframe>
      </div>
    </div>
  );
}
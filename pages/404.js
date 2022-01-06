import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter()
  return <div>
    <Navbar />
    <div className="fill-page">
      <div>
        <div className="image-container">
          <Image src="/assets/images/cant-find.gif" alt="" width={120} height={120} className="image" />
        </div>
        <div className="message">
          <h1>Error 404</h1>
          <p>Page not found</p>
        </div>
        <div className="button" onClick={() => {router.push('/')}}>
          Go home
        </div>
      </div>
    </div>
  </div>;
}
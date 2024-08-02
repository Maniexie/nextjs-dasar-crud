// import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LinksHome() {
  //   const pathName = usePathname();
  return (
    <div>
      <Link href="/product">Product</Link>
      <br />
      <Link href="/user">user</Link>
    </div>
  );
}

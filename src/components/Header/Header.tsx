export default function Header() {
  let month = new Date().toLocaleString("en-US", { month: "long" });
  let year = new Date().getUTCFullYear();

  return (
    <div>
      Available budget in {month} {year}
    </div>
  );
}

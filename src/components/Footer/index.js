function Footer() {
  return (
    <footer className="border py-5">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} QUIZ APP</p>
        <div className="mt-2">
          <p className="hover:text-blue-400 mx-2 inline-block">
            Đào Xuân Trí
          </p>
          <p className=" hover:text-blue-400 mx-2 inline-block">
            B21DCCN721
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import CatalogPage from "./catalog/page";
import Header from "@/components/Templates/Header";
import Footer from "@/components/Templates/Footer";

const Sidebar = () => {
  return (
    <aside
      className={`hidden
        lg:block bg-gray-100 p-4 w-full fixed lg:relative left-0 top-0 bottom-0 lg:w-[20%] z-40 ml-2`}
    >
      <div>
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover">
              T-shirt (2)
            </a>
          </li>
          <li>
            <a href="#" className="hover">
              Pants (2)
            </a>
          </li>
          <li>
            <a href="#" className="hover">
              Socs (2)
            </a>
          </li>
          <li>
            <a href="#" className="hover">
              Belt (2)
            </a>
          </li>
        </ul>
      </div>
      <div className="my-4">
        <h2 className="text-lg font-semibold mb-4">Color</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-red-500 border-none cursor-pointer hover:bg-red-500" />
          <button className="bg-blue-500 border-none cursor-pointer hover:bg-blue-500" />
          <button className="bg-yellow-500 border-none cursor-pointer hover:bg-yellow-500" />
          <button className="bg-black border-none cursor-pointer hover:bg-black" />
        </div>
      </div>
    </aside>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed w-full z-50 top-0">
      <Header />
      </div>
      <div className="flex flex-col lg:flex-row flex-1 mt-16">
        <Sidebar />
        <main className="flex-1 container p-4">
          <CatalogPage />
        </main>
      </div>
      <Footer />
    </div>
  );
}

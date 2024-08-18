import Footer from "./components/Footer"
import Header from "./components/Header"
import TodoMain from "./components/TodoMain"

function App() {

  return (
    <>
      <section className="top-highlight"></section>
      <main>
        <Header />
        <TodoMain />
        <Footer />
      </main>
    </>
  )
}

export default App

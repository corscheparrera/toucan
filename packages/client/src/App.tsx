import "./App.css";
import Header from "./components/organisms/Header";
import RecipeList from "./containers/RecipeListContainer";
import { RecipeProvider } from "./store/Recipe";
const App: React.FC = () => {
  return (
    <div className="app">
      <RecipeProvider>
        <Header />
        <RecipeList />
      </RecipeProvider>
    </div>
  );
};

export default App;

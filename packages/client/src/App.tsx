import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import "./App.css";
import Header from "./components/organisms/Header";
import RecipeList from "./containers/RecipeListContainer";
import { trpc } from "./lib/trpc";
import { RecipeProvider } from "./store/Recipe";
const App: React.FC = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [httpBatchLink({ url: "http://localhost:3000/trpc" })]
    });
  });
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <RecipeProvider>
            <Header />
            <RecipeList />
          </RecipeProvider>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;

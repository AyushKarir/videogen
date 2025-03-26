import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import {
  Box,
  ChevronsLeft,
  ChevronsRight,
  LoaderCircle,
  RotateCcw,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";

type Props = {
  updateFunction: (modelId: string) => void;
};

interface Model {
  model_id: string;
  status: string;
  created_at: string | null;
  instance_prompt: string;
  model_name: string;
  description: string;
  screenshots: string;
}

const SelectModel = ({ updateFunction }: Props) => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const modelsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const { apiKey } = useApiKeyStore();

  const totalPages = Math.ceil(models.length / modelsPerPage);

  const filteredModels = models.filter(
    (model) =>
      model.model_name &&
      model.model_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function getModels() {
    if (!apiKey) return;

    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        "https://modelslab.com/api/v4/dreambooth/model_list",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: apiKey }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.log(error);

      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (apiKey) {
      setIsAuthenticated(true);
      getModels();
    }
  }, [apiKey]);

  const handleNextPage = () => {
    if ((currentPage + 1) * modelsPerPage < models.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-xs text-muted-foreground">Not authenticated</div>
    );
  }

  if (loading) {
    return (
      <div>
        <LoaderCircle className="animate-spin size-4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className=" flex items-center gap-2">
        <p className="text-xs text-muted-foreground">Error fetching models.</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant={"outline"}
              size={"icon"}
              className="aspect-square"
              onClick={getModels}
            >
              <RotateCcw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Retry</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <ScrollArea className="h-72 px-3">
      <div className="px-1">
        <Input
          className="my-2"
          placeholder="Search model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2 gap-y-3 justify-center items-start">
        {filteredModels
          .slice(currentPage * modelsPerPage, (currentPage + 1) * modelsPerPage)
          .map((model, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => {
                    updateFunction(model.model_id);
                  }}
                  className="w-20 flex flex-col gap-1 hover:bg-muted/50 rounded-md transition-colors cursor-pointer overflow-hidden"
                >
                  <div className="w-20 h-20 rounded-md border border-border flex justify-center items-center">
                    <Box />
                  </div>
                  <p className="text-xs text-center text-ellipsis w-20 whitespace-nowrap px-1 py-0.5 overflow-hidden">
                    {model.model_name}
                  </p>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{model.model_name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
      </div>
      <div className="flex justify-between mt-2 items-center pr-2">
        <Button
          size={"icon"}
          variant={"outline"}
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          <ChevronsLeft />
        </Button>
        <span className="text-xs">
          {currentPage + 1}/{totalPages}
        </span>
        <Button
          size={"icon"}
          variant={"outline"}
          type="button"
          onClick={handleNextPage}
          disabled={(currentPage + 1) * modelsPerPage >= models.length}
        >
          <ChevronsRight />
        </Button>
      </div>
    </ScrollArea>
  );
};

export default SelectModel;

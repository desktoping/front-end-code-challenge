import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { INSTRUCTION_QUERY_KEY } from "../const";

const Instruction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [instructions, setInstructions] = useState("");

  const queryClient = useQueryClient();

  const { mutateAsync: sendInstructions } = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return fetch(`http://localhost:4001/instruct-drone?instructions=${instructions}`).then((r) => r.json());
    },
    onSuccess: (data) => {
      queryClient.setQueryData([INSTRUCTION_QUERY_KEY], data);
    },
    onSettled: () => setIsLoading(false),
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", height: 40, width: "80vw", padding: 10, gap: 10 }}>
      <input
        type="text"
        style={{ height: 40 }}
        value={instructions}
        onChange={(ev) => setInstructions(ev.target.value)}
      />
      <button style={{ height: 40 }} onClick={() => sendInstructions()}>
        {isLoading ? "Loading..." : "Send Instructions"}
      </button>
    </div>
  );
};

export default Instruction;

import React, { useState } from "react";
import { Button, FormControl, Input, Stack } from "@mui/material";
import { useAddManagerMutation } from "./useManagersQuery";

export const AddNewManager = ({
  onComplete,
  onCancel,
  externalSystem,
  userId,
}: {
  onComplete: () => void;
  onCancel: () => void;
  externalSystem: string;
  userId: string;
}) => {
  const [newManager, setNewManager] = useState<string>("");
  const addManager = useAddManagerMutation();

  const handleAddNewManager = async () => {
    try {
      await addManager.mutateAsync({
        email: newManager,
        externalSystem,
        userId,
      });

      onComplete();
      setNewManager("");
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <FormControl>
      <Input
        placeholder="Email"
        type="email"
        value={newManager}
        onChange={(e) => setNewManager(e.target.value)}
      />
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => {
            setNewManager("");
            onCancel && onCancel();
          }}
        >
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleAddNewManager}>
          Add
        </Button>
      </Stack>
    </FormControl>
  );
};

"use client";
import { Button } from "@heroui/react";

const DeletePropertyBtn = (propertyId) => {
  const handleDelete = () => {};
  return (
    <Button slot="close" variant="danger" onClick={handleDelete}>
      Delete Property
    </Button>
  );
};

export default DeletePropertyBtn;

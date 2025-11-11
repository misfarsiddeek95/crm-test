import { useState } from "react";
import { Container, Title, Button, Group } from "@mantine/core";
import { CustomerTable } from "./components/CustomerTable";
import { CustomerForm } from "./components/CustomerForm";
import type { Customer } from "./types/customer";

function App() {
  // --- State Management ---

  // 1. Controls the visibility of the Create/Edit modal
  const [modalOpened, setModalOpened] = useState(false);

  // 2. Holds the customer data for editing.
  //    If 'null', the form is in "Create" mode.
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // 3. A simple trick to force the <CustomerTable> to refetch its data.
  //    When we increment this 'key', React unmounts and remounts the table.
  const [tableKey, setTableKey] = useState(0);

  // --- Handler Functions ---

  // Called by the "+ Create Customer" button
  const handleOpenCreateModal = () => {
    setEditingCustomer(null); // Clear any existing edit data
    setModalOpened(true); // Open the modal
  };

  // Passed as the 'onEdit' prop to <CustomerTable>
  const handleOpenEditModal = (customer: Customer) => {
    setEditingCustomer(customer); // Set the customer to edit
    setModalOpened(true); // Open the modal
  };

  // Passed as the 'onSuccess' prop to <CustomerForm>
  const handleFormSuccess = () => {
    setModalOpened(false); // Close the modal
    setTableKey((prev) => prev + 1); // Increment the key to refresh the table
  };

  // --- Render ---
  return (
    <Container p="md" fluid>
      {/* 1. Page Header */}
      <Group justify="space-between" mb="lg">
        <Title order={1}>Customer Management</Title>
        <Button onClick={handleOpenCreateModal}>+ Create Customer</Button>
      </Group>

      {/* 2. Customer Table */}
      <CustomerTable
        key={tableKey} // This 'key' is crucial for refreshing
        onEdit={handleOpenEditModal}
      />

      {/* 3. Create/Edit Modal (hidden by default) */}
      <CustomerForm
        opened={modalOpened}
        onClose={() => setModalOpened(false)} // Close when backdrop is clicked
        customer={editingCustomer}
        onSuccess={handleFormSuccess}
      />
    </Container>
  );
}

export default App;

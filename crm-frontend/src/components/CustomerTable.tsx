import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Group,
  Text,
  Loader,
  Alert,
  ScrollArea,
} from "@mantine/core";
import apiService from "../api/apiService";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal"; // Import delete modal
import type { Customer } from "../types/customer";

// 1. Props interface
interface CustomerTableProps {
  onEdit: (customer: Customer) => void;
}

export function CustomerTable({ onEdit }: CustomerTableProps) {
  // 2. State definitions
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. State for the delete modal
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null
  );

  // 4. Data fetching
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true); // Start loading
        const response = await apiService.get("/customer");
        setCustomers(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch customers:", err);
        setError("Failed to fetch customers. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchCustomers();
  }, []);

  // 5. Delete modal handlers
  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteModalOpened(true);
  };

  const handleConfirmDelete = async () => {
    if (!customerToDelete) return;

    setDeleteLoading(true);
    try {
      await apiService.delete(`/customer/${customerToDelete.id}`);
      setCustomers(
        customers.filter((customer) => customer.id !== customerToDelete.id)
      );
      closeDeleteModal();
    } catch (err) {
      console.error(`Failed to delete customer ${customerToDelete.id}:`, err);
      setError("Failed to delete customer.");
      setDeleteLoading(false); // Stop loading on error
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpened(false);
    setDeleteLoading(false);
    setCustomerToDelete(null);
  };

  // 6. Create table rows
  const rows = customers.map((customer) => (
    <Table.Tr key={customer.id}>
      <Table.Td>{customer.id}</Table.Td>
      <Table.Td>
        {customer.firstName} {customer.lastName}
      </Table.Td>
      <Table.Td>{customer.email}</Table.Td>
      <Table.Td>{customer.phone || "N/A"}</Table.Td>
      <Table.Td>{customer.companyName || "N/A"}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            size="xs"
            variant="outline"
            onClick={() => onEdit(customer)} // Call the prop
          >
            Edit
          </Button>
          <Button
            size="xs"
            color="red"
            variant="outline"
            onClick={() => handleDeleteClick(customer)} // Open modal
          >
            Delete
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  // 7. Handle loading state
  if (loading) {
    return <Loader color="blue" style={{ margin: "auto", display: "block" }} />;
  }

  // 8. Handle error state
  if (error) {
    return (
      <Alert color="red" title="Error">
        {error}
      </Alert>
    );
  }

  // 9. Render the table and modal
  return (
    <>
      <ScrollArea>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Company</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text>No customers found.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <DeleteConfirmationModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        itemName={customerToDelete?.email || "this customer"}
      />
    </>
  );
}

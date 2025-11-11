import { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Stack,
  Checkbox,
  Alert,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import apiService from "../api/apiService";
import type { Customer } from "../types/customer";

// 2. Define the component props
interface CustomerFormProps {
  opened: boolean;
  onClose: () => void;
  customer: Customer | null; // Null for "Create" mode, Customer object for "Edit" mode
  onSuccess: (customer: Customer) => void; // Callback to update parent table
}

export function CustomerForm({
  opened,
  onClose,
  customer,
  onSuccess,
}: CustomerFormProps) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const isEditMode = !!customer;

  // 3. Setup Mantine form
  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      companyName: "",
      address: "",
      city: "",
      isActive: true,
    },

    // 4. Client-side validation
    validate: {
      email: (value) =>
        value.trim() === ""
          ? "Email is required"
          : /^\S+@\S+\.\S+$/.test(value)
          ? null
          : "Invalid email",
      // You can add more rules here
    },
  });

  // 5. Populate form when in "Edit" mode
  // This effect runs when the modal is opened or the customer prop changes
  useEffect(() => {
    if (isEditMode) {
      // Set form values from the customer prop
      form.setValues({
        email: customer.email,
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        phone: customer.phone || "",
        companyName: customer.companyName || "",
        address: customer.address || "",
        city: customer.city || "",
        isActive: customer.isActive,
      });
    } else {
      // Clear form when in "Create" mode
      form.reset();
    }
    setApiError(null); // Clear old errors
  }, [customer, opened]); // Rerun when these change

  // 6. Handle form submission
  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setApiError(null);

    try {
      let response;
      if (isEditMode) {
        // Update (PATCH)
        response = await apiService.patch(`/customer/${customer.id}`, values);
      } else {
        // Create (POST)
        response = await apiService.post("/customer", values);
      }

      onSuccess(response.data); // Send new/updated customer back to parent
      onClose(); // Close the modal
    } catch (err) {
      console.error("Failed to save customer:", err);
      setApiError("Failed to save customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditMode ? `Edit ${customer.email}` : "Create New Customer"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          {apiError && (
            <Alert color="red" title="Error">
              {apiError}
            </Alert>
          )}

          <TextInput
            label="Email"
            placeholder="example@email.com"
            required
            {...form.getInputProps("email")}
          />
          <Group grow>
            <TextInput
              label="First Name"
              placeholder="John"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="Doe"
              {...form.getInputProps("lastName")}
            />
          </Group>
          <TextInput
            label="Phone"
            placeholder="+1 234 567 890"
            {...form.getInputProps("phone")}
          />
          <TextInput
            label="Company Name"
            placeholder="Acme Inc."
            {...form.getInputProps("companyName")}
          />
          <TextInput
            label="Address"
            placeholder="123 Main St"
            {...form.getInputProps("address")}
          />
          <TextInput
            label="City"
            placeholder="New York"
            {...form.getInputProps("city")}
          />
          <Checkbox
            label="Is Active"
            {...form.getInputProps("isActive", { type: "checkbox" })}
          />
          <Button type="submit" loading={loading} fullWidth mt="md">
            {isEditMode ? "Update Customer" : "Create Customer"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

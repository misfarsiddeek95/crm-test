import { Modal, Text, Button, Group, Alert, Stack } from "@mantine/core";

interface DeleteConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  itemName?: string; // e.g., "customer", "product"
}

export function DeleteConfirmationModal({
  opened,
  onClose,
  onConfirm,
  loading,
  itemName = "this item", // Default text
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Confirm Deletion"
      centered
      size="sm"
    >
      <Stack>
        <Alert color="red" title="Warning" variant="light">
          This action is permanent and cannot be undone.
        </Alert>

        <Text>Are you sure you want to delete {itemName}?</Text>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button color="red" onClick={onConfirm} loading={loading}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

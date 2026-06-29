"use client";
import { UpdateUserSession } from "@/app/lib/action/action";
import { EllipsisVertical } from "@gravity-ui/icons";
import {
  Button,
  Description,
  Dropdown,
  Header,
  Label,
  Separator,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiHome,
  FiShield,
  FiSlash,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
const UserAction = ({ user }) => {
  const router = useRouter();
  const handleChangeStatus = async (value) => {
    try {
      console.log(value);
      if (value === "activate") {
        const userStatusUpdate = await UpdateUserSession({
          userId: user?._id,
          userStatus: "active",
        });

        if (userStatusUpdate.success) {
          toast.success("User activated successfully");
        } else {
          toast("Failed to activate user");
        }
      } else if (value === "suspend") {
        const userStatusUpdate = await UpdateUserSession({
          userId: user?._id,
          userStatus: "suspended",
        });

        if (userStatusUpdate.success) {
          toast.success("User suspended successfully");
        } else {
          toast("Failed to suspend user");
        }
      } else if (value === "delete-user") {
        const userDelete = await UpdateUserSession({
          userId: user?._id,
          userStatus: "deleted",
        });

        if (userDelete.success) {
          toast.success("User deleted successfully");
        } else {
          toast("Failed to delete user");
        }
      } else if (value === "make-admin") {
        const userRoleUpdate = await UpdateUserSession({
          userId: user?._id,
          userRole: "admin",
        });

        if (userRoleUpdate.success) {
          toast.success("User role updated to admin");
        } else {
          toast("Failed to update user role");
        }
      } else if (value === "make-owner") {
        const userRoleUpdate = await UpdateUserSession({
          userId: user?._id,
          userRole: "owner",
        });

        if (userRoleUpdate.success) {
          toast.success("User role updated to owner");
        } else {
          toast("Failed to update user role");
        }
      } else if (value === "make-tenant") {
        const userRoleUpdate = await UpdateUserSession({
          userId: user?._id,
          userRole: "tenant",
        });

        if (userRoleUpdate.success) {
          toast.success("User role updated to tenant");
        } else {
          toast("Failed to update user role");
        }
      } else {
        toast("Invalid status");
      }
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <Dropdown>
        <Button isIconOnly aria-label="Menu" variant="secondary">
          <EllipsisVertical className="outline-none" />
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu onAction={(key) => handleChangeStatus(key)}>
            {/* Role Management */}
            <Dropdown.Section>
              <Header>Change Role</Header>

              <Dropdown.Item id="make-admin" textValue="Make Admin">
                <div className="flex h-8 items-start justify-center pt-px">
                  <FiShield className="size-4 shrink-0 text-blue-600" />
                </div>

                <div className="flex flex-col">
                  <Label>Make Admin</Label>
                  <Description>Grant administrator privileges</Description>
                </div>
              </Dropdown.Item>

              <Dropdown.Item id="make-owner" textValue="Make Owner">
                <div className="flex h-8 items-start justify-center pt-px">
                  <FiHome className="size-4 shrink-0 text-emerald-600" />
                </div>

                <div className="flex flex-col">
                  <Label>Make Owner</Label>
                  <Description>Allow property management access</Description>
                </div>
              </Dropdown.Item>

              <Dropdown.Item id="make-tenant" textValue="Make Tenant">
                <div className="flex h-8 items-start justify-center pt-px">
                  <FiUser className="size-4 shrink-0 text-amber-600" />
                </div>

                <div className="flex flex-col">
                  <Label>Make Tenant</Label>
                  <Description>Set standard tenant permissions</Description>
                </div>
              </Dropdown.Item>
            </Dropdown.Section>

            <Separator />

            {/* Account Status */}
            <Dropdown.Section>
              <Header>Account Status</Header>

              <Dropdown.Item id="activate" textValue="Activate User">
                <div className="flex h-8 items-start justify-center pt-px">
                  <FiCheckCircle className="size-4 shrink-0 text-emerald-600" />
                </div>

                <div className="flex flex-col">
                  <Label>Activate User</Label>
                  <Description>Restore account access</Description>
                </div>
              </Dropdown.Item>

              <Dropdown.Item id="suspend" textValue="Suspend User">
                <div className="flex h-8 items-start justify-center pt-px">
                  <FiSlash className="size-4 shrink-0 text-orange-600" />
                </div>

                <div className="flex flex-col">
                  <Label>Suspend User</Label>
                  <Description>Temporarily disable account</Description>
                </div>
              </Dropdown.Item>
            </Dropdown.Section>

            <Separator />

            {/* Danger Zone */}
            <Dropdown.Section>
              <Header>Danger Zone</Header>

              <Dropdown.Item
                id="delete-user"
                textValue="Delete User"
                variant="danger"
              >
                <div className="flex h-8 items-start justify-center pt-px">
                  <FiTrash2 className="size-4 shrink-0 text-danger" />
                </div>

                <div className="flex flex-col">
                  <Label>Delete User</Label>
                  <Description>Permanently remove account</Description>
                </div>
              </Dropdown.Item>
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </>
  );
};

export default UserAction;

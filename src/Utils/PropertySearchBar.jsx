"use client";

import {
  ArrowRotateLeft,
  CircleDollar,
  House,
  Magnifier,
  MapPin,
} from "@gravity-ui/icons";
import {
  TextField,
  Input,
  Label,
  Select,
  ListBox,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function PropertySearchBar({ width }) {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      location: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
    },
  });

  const onSubmit = (data) => {
    const params = new URLSearchParams();

    if (data.location?.trim()) {
      params.set("location", data.location.toLowerCase().trim());
    }

    if (data.propertyType) {
      params.set("propertyType", data.propertyType);
    }

    if (data.minPrice) {
      params.set("minPrice", data.minPrice);
    }

    if (data.maxPrice) {
      params.set("maxPrice", data.maxPrice);
    }

    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    reset({
      location: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
    });

    router.replace("/properties");
  };

  return (
    <section className="w-full">
      <div
        className={`mx-auto ${width} rounded-3xl bg-background p-6 shadow-2xl`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6"
        >
          {/* Location */}
          <div className="xl:col-span-2">
            <Label className="mb-2 block text-sm font-medium text-foreground/70">
              Location
            </Label>

            <TextField>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-primary" />

                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Where to?"
                      className="
                        h-14 w-full rounded-2xl
                        placeholder:text-foreground/70
                        text-sm sm:text-base lg:text-lg
                        text-foreground
                        border border-foreground/20
                        bg-background pl-12
                      "
                    />
                  )}
                />
              </div>
            </TextField>
          </div>

          {/* Property Type */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-foreground/70">
              Property Type
            </Label>

            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <Select
                  selectedKey={field.value || null}
                  onSelectionChange={(key) => field.onChange(key)}
                >
                  <Select.Trigger className="h-14 rounded-2xl border border-foreground/20 bg-background">
                    <div className="flex items-center gap-3">
                      <House className="h-5 w-5 text-primary" />
                      <Select.Value />
                    </div>

                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="bg-background">
                    <ListBox>
                      <ListBox.Item id="apartment">Apartment</ListBox.Item>

                      <ListBox.Item id="villa">Villa</ListBox.Item>

                      <ListBox.Item id="duplex">Duplex</ListBox.Item>

                      <ListBox.Item id="office">Office</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />
          </div>

          {/* Max Price */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-foreground/70">
              Max Price
            </Label>

            <TextField>
              <div className="relative">
                <CircleDollar className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-primary" />

                <Controller
                  name="maxPrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ""}
                      type="number"
                      placeholder="Max Price"
                      className="
                        h-14 w-full rounded-2xl
                        border border-foreground/20
                        bg-background pl-12
                        text-sm sm:text-base
                        text-foreground
                      "
                    />
                  )}
                />
              </div>
            </TextField>
          </div>

          {/* Min Price */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-foreground/70">
              Min Price
            </Label>

            <TextField>
              <div className="relative">
                <CircleDollar className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-primary" />

                <Controller
                  name="minPrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ""}
                      type="number"
                      placeholder="Min Price"
                      className="
                        h-14 w-full rounded-2xl
                        border border-foreground/20
                        bg-background pl-12
                        text-sm sm:text-base
                        text-foreground
                      "
                    />
                  )}
                />
              </div>
            </TextField>
          </div>

          {/* Actions */}
          <div className="flex gap-2 items-end col-span-2 lg:col-span-1">
            <Button
              type="submit"
              className="
                h-14 flex-1 rounded-2xl
                bg-secondary text-white
                font-semibold shadow-lg
                transition-all duration-300
                hover:scale-[1.02]
              "
            >
              <Magnifier size={18} />
              Search
            </Button>

            <Button
              type="button"
              onPress={handleReset}
              variant="outline"
              className="h-14 px-4 rounded-2xl"
            >
              <ArrowRotateLeft size={18} />
              Clear
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

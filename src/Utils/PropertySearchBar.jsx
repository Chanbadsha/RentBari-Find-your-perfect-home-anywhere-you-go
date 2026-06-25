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
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function PropertySearchBar({ width }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const params = new URLSearchParams(searchParams.toString());
    data.location = data.location.toLowerCase();
    data.location && params.set("location", data.location);
    data.propertyType && params.set("propertyType", data.propertyType);
    data.minPrice && params.set("minPrice", data.minPrice);
    data.maxPrice && params.set("maxPrice", data.maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="w-full">
      <div
        className={`mx-auto  ${width}   rounded-3xl bg-background p-6 shadow-2xl`}
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
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />

                <Input
                  {...register("location")}
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
              </div>
            </TextField>
          </div>

          {/* Property Type */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-foreground/70">
              Property Type
            </Label>

            <Controller
              control={control}
              name="propertyType"
              render={({ field }) => (
                <Select
                  selectedKey={field.value}
                  onSelectionChange={(key) => field.onChange(key)}
                >
                  <Select.Trigger className="h-14 rounded-2xl border border-foreground/20 bg-background">
                    <div className="flex items-center gap-3">
                      <House className="h-5 w-5 text-primary" />
                      <Select.Value
                        className="
    text-sm sm:text-base
    text-foreground/70
  "
                      />
                    </div>

                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="bg-background">
                    <ListBox>
                      <ListBox.Item
                        className="text-foreground/70"
                        id="apartment"
                      >
                        Apartment
                      </ListBox.Item>

                      <ListBox.Item className="text-foreground/70" id="villa">
                        Villa
                      </ListBox.Item>

                      <ListBox.Item className="text-foreground/70" id="duplex">
                        Duplex
                      </ListBox.Item>

                      <ListBox.Item className="text-foreground/70" id="office">
                        Office
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />
          </div>

          {/*Max Price */}
          <div className="">
            <Label className="mb-2 block text-sm font-medium text-foreground/70">
              Price Range
            </Label>

            <TextField>
              <div className="relative">
                <CircleDollar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />

                <Input
                  {...register("maxPrice")}
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
              </div>
            </TextField>
          </div>

          {/* Min Price */}
          <div className="">
            <Label className="mb-2 block text-sm font-medium text-foreground/70">
              Price Range
            </Label>

            <TextField>
              <div className="relative">
                <CircleDollar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />

                <Input
                  {...register("minPrice")}
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
              </div>
            </TextField>
          </div>

          {/* Search Button */}
          <div className="flex gap-2 items-end col-span-2 lg:col-span-1">
            <Button
              type="submit"
              className="
      h-14
      flex-1
      rounded-2xl
      bg-secondary
      text-white
      font-semibold
      shadow-lg
      transition-all
      duration-300
      hover:scale-[1.02]
    "
            >
              <Magnifier size={18} />
              Search
            </Button>

            <Button variant="outline" className="h-14 px-4 rounded-2xl">
              <ArrowRotateLeft size={18} />
              Clear
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

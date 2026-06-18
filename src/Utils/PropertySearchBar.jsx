"use client";

import { CircleDollar, House, Magnifier, MapPin } from "@gravity-ui/icons";
import {
  TextField,
  Input,
  Label,
  Select,
  ListBox,
  Button,
} from "@heroui/react";

export default function PropertySearchBar() {
  return (
    <section className="w-full">
      <div className="mx-auto  lg:w-10/12 xl:w-8/12  rounded-3xl bg-background p-6 shadow-2xl">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6">
          {/* Location */}
          <div className="xl:col-span-2">
            <Label className="mb-2 block text-sm font-medium text-foreground/70">
              Location
            </Label>

            <TextField>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />

                {/* <Input
                  placeholder="Where to?"
                  className="h-14 w-full  rounded-2xl placeholder:text-foreground/70 text-foreground border border-foreground/20 bg-background pl-12"
                /> */}
                <Input
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

            <Select defaultValue={"apartment"}>
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
                  <ListBox.Item className="text-foreground/70" id="apartment">
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
          <div className="flex items-end col-span-2 lg:col-span-1">
            <Button
              className="
                h-14
                w-full
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
          </div>
        </div>
      </div>
    </section>
  );
}

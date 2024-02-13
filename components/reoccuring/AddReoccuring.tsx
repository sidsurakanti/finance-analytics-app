import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@components/ui/sheet"
import {
  Button
} from "@components/ui/button"
import {
  PlusIcon
} from "@components/ui/icons"

export function ReoccuringSheet() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <Button className="hidden md:block">
              <p>+ reoccuring</p>
            </Button>
            <Button className="md:hidden" size="icon">
              <PlusIcon height={17} width={17} />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create reoccuring</SheetTitle>
            <SheetDescription>
              Add a new reoccuring transaction to your account
            </SheetDescription>
            {/* <CreateReoccuringForm /> */}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SelectMenu from "./SelectMenu";
import { classNames } from "src/helpers";

const options = [
  { key: "10", value: 10 },
  { key: "20", value: 20 },
  { key: "50", value: 50 },
  { key: "75", value: 75 },
  { key: "100", value: 100 },
  { key: "All", value: 1000000000 },
];

const HorizontalEllipsis = () => (
  <div className="flex h-8 w-auto items-end gap-x-1 px-2">
    <div className="h-1 w-1 rounded-full bg-gray-300"></div>
    <div className="h-1 w-1 rounded-full bg-gray-300"></div>
    <div className="h-1 w-1 rounded-full bg-gray-300"></div>
  </div>
);

const PaginationFooter = ({ offset = 0, limit = 50, count = 1, itemName = "Document", onChange = () => {} }) => {
  const [tabCount, setTabCount] = useState(1);
  useEffect(() => {
    if (count && limit) {
      setTabCount(Math.ceil(count / limit));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, count]);

  return (
    <div className="relative flex flex-wrap justify-between items-center py-3 h-20">
      <div className="my-2 text-sm text-gray-400 sm:ml-0">
        {count >= 10 && (
          <div className="flex items-center gap-x-2">
            <span className="hidden sm:inline">Showing</span>
            <SelectMenu
              options={options}
              startIndex={options.findIndex((option) => option.value === limit)}
              setOption={(option) => {
                onChange({ limit: option.value, offset: 0 });
              }}
            />{" "}
            per page.
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-2 sm:w-auto sm:justify-end">
        <div className={classNames("text-sm text-gray-500 font-light mr-5")}>
          {count === 0 ? (
            <>{`No ${itemName.toLowerCase()}s found.`}</>
          ) : (
            <>
              {`${itemName}`}
              {count !== offset * limit + 1 && "s"}
              <span className="px-1 font-bold">
                {offset * limit + 1}
                {count !== offset * limit + 1 && <> - {count < offset * limit + limit ? count : offset * limit + limit}</>}
              </span>
              {`of ${count}`}
            </>
          )}
        </div>
        {count >= 10 && (
          <>
            <div
              className={classNames("flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-white text-sm shadow hover:bg-gray-50", offset > 0 ? "" : "opacity-40 cursor-not-allowed")}
              onClick={() => {
                if (offset - 1 >= 0) {
                  onChange({ limit, offset: offset - 1 });
                }
              }}>
              <ChevronDoubleLeftIcon className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-center space-x-1 sm:w-auto sm:justify-end">
              <div
                className={classNames("flex h-8 w-8 cursor-pointer items-center justify-center rounded text-sm shadow", tabCount === 1 ? "cursor-not-allowed opacity-40" : offset === 0 ? "bg-amber-400 text-white hover:bg-amber-400 hover:text-white" : "bg-white hover:bg-gray-50")}
                onClick={() => onChange({ limit, offset: 0 })}>
                {1}
              </div>
              {tabCount > 1 && (
                <>
                  {offset > 2 ? <HorizontalEllipsis /> : null}
                  {offset >= 2 ? (
                    <div
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-white text-sm shadow hover:bg-gray-50"
                      onClick={() => onChange({ limit, offset: offset - 1 })}>
                      {offset}
                    </div>
                  ) : null}
                  {0 !== offset && offset + 1 !== tabCount ? <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-sm shadow bg-amber-400 text-white hover:bg-amber-400 hover:text-white">{offset + 1}</div> : null}
                  {offset < tabCount - 2 ? (
                    <div
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-white text-sm shadow hover:bg-gray-50"
                      onClick={() => onChange({ limit, offset: offset + 1 })}>
                      {offset + 2}
                    </div>
                  ) : null}
                  {offset < tabCount - 3 ? <HorizontalEllipsis /> : null}
                </>
              )}
              {tabCount > 1 && (
                <div
                  className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded  text-sm shadow ${offset + 1 === tabCount ? "bg-amber-400 text-white hover:bg-amber-400 hover:text-white" : "bg-white hover:bg-gray-50"}`}
                  onClick={() => onChange({ limit, offset: tabCount - 1 })}>
                  {tabCount}
                </div>
              )}
            </div>
            <div
              className={classNames("flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-white text-sm shadow hover:bg-gray-50", offset + 1 < tabCount ? "" : "opacity-40 cursor-not-allowed")}
              onClick={() => {
                if (offset + 1 < tabCount) {
                  onChange({ limit, offset: offset + 1 });
                }
              }}>
              <ChevronDoubleRightIcon className="h-4 w-4" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaginationFooter;

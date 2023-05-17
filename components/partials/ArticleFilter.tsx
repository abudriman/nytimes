import { useStoreActions, useStoreState } from '@/hooks/useStore';
import { ChevronDown } from 'react-feather';
import { ReactNode, useState, useCallback, FocusEvent } from 'react';
import formatHumanDate from '@/utils/formatHumanDate';

interface FilterButtonProps {
  children: ReactNode;
  floatingChildren: (dismiss: () => void) => ReactNode;
  autoDismiss?: boolean;
}

const FilterButton = ({
  children,
  floatingChildren,
  autoDismiss,
}: FilterButtonProps) => {
  const [open, setOpen] = useState(false);
  const handleBlur = useCallback((e: FocusEvent<HTMLButtonElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  }, []);
  const dismiss = () => {
    setOpen(false);
  };
  return (
    <button
      onClick={() => {
        setOpen(old => !old);
      }}
      className="ny-button rounded-full flex items-center text-xs relative"
      onBlur={handleBlur}
    >
      {children}
      <div
        onClick={e => {
          if (autoDismiss) {
            return;
          } else {
            e.stopPropagation();
          }
        }}
        className={`absolute ${
          open ? '' : 'hidden'
        } left-0 right-0 top-full mt-1 bg-zinc-200 dark:bg-zinc-700 z-20 w-full`}
      >
        {floatingChildren(dismiss)}
      </div>
    </button>
  );
};

interface SortButton {}

const SortButton = ({ name }: { name: 'newest' | 'oldest' | 'relevance' }) => {
  const setSort = useStoreActions(actions => actions.setSort);
  return (
    <div
      className="last:border-b-0 border-b-[1px] border-black py-2 cursor-pointer"
      onClick={() => {
        setSort(name);
      }}
    >
      {name}
    </div>
  );
};

const ArticleFilter = () => {
  const sort = useStoreState(state => state.sort);
  const begin_date = useStoreState(state => state.begin_date);
  const end_date = useStoreState(state => state.end_date);
  const setBeginDate = useStoreActions(actions => actions.setBeginDate);
  const setEndDate = useStoreActions(actions => actions.setEndDate);
  const handleDateChange = () => {
    let endDateValue = (document.getElementById('end_date') as HTMLInputElement)
      ?.value;
    let beginDateValue = (
      document.getElementById('begin_date') as HTMLInputElement
    )?.value;
    if (endDateValue && endDateValue !== '') {
      setEndDate(new Date(endDateValue));
    }
    if (beginDateValue && beginDateValue !== '') {
      setBeginDate(new Date(beginDateValue));
    }
  };
  return (
    <div className="flex  scrollbar-none flex-col sm:flex-row items-start space-y-2 sm:space-y-0 space-x-0 sm:space-x-2">
      <FilterButton
        autoDismiss
        floatingChildren={() => {
          return (
            <div className="flex flex-col">
              <SortButton name="newest" />
              <SortButton name="oldest" />
              <SortButton name="relevance" />
            </div>
          );
        }}
      >
        <span>{sort}</span> <ChevronDown className="ml-2" size={12} />{' '}
      </FilterButton>

      <FilterButton
        floatingChildren={dismiss => {
          return (
            <div className="flex flex-col space-y-2 items-start p-2">
              <label htmlFor="begin_date">Begin Date</label>
              <input
                className="self-stretch"
                type="date"
                name="begin_date"
                id="begin_date"
              />
              <label htmlFor="end_date">End Date</label>
              <input
                className="self-stretch"
                type="date"
                name="end_date"
                id="end_date"
              />
              <div
                className="bg-black text-white px-4 py-2  cursor-point"
                onClick={() => {
                  handleDateChange();
                  dismiss();
                }}
              >
                Apply
              </div>
            </div>
          );
        }}
      >
        <span>
          {formatHumanDate(new Date(begin_date))} -{' '}
          {formatHumanDate(new Date(end_date))}
        </span>
        <ChevronDown className="ml-2" size={12} />
      </FilterButton>
    </div>
  );
};

export default ArticleFilter;

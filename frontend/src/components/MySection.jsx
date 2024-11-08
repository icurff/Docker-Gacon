export function MySection({ children }) {
  return (
    <div className="mx-8 my-5 flex justify-center">
      <div className="w-full">
        <div className="flex flex-col rounded-xl border-2 border-black bg-white p-5 dark:border-none dark:bg-zinc-800">
          {children}
        </div>
      </div>
    </div>
  );
}

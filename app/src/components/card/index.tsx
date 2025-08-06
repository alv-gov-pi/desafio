export default function CardPadrao({ children, titulo }: { children: React.ReactNode, titulo: string }) {
    return (
        <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12 flex flex-col">
                <h1 className="text-xl font-semibold text-content-emphasis">{titulo} </h1>
            {children}
        </div>
    );
}
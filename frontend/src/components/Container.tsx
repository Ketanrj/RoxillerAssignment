type Props = {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: Props) {
  return (
    <div className="flex mx-auto w-full h-screen items-center justify-center bg-gray-50 text-gray-800 font-satoshi">
      <div className={`w-full  ${className == '' ? ' max-w-md' : className}`}>{children}</div>
    </div>
  )
}

export default Container

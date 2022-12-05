import { forwardRef } from "react"
export const Input = forwardRef((props, ref) => {
   return  <input ref={ref} className="form-control mb-3" {...props} />;
})

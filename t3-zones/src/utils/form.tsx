
// Receita event from element `submit` and extract data to object basic
export function extractTargetForm(e: any) : any {
    e.preventDefault()
    const elements = e.target.elements;
    return Object.keys(elements).reduce((prev,k) => {
        if(!elements[k].name) {
            return prev; 
        }
        let value = elements[k].value;
        prev[k] = value;
        return prev;
    }, {} as any)
  }
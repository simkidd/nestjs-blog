import slugify from "slugify";

interface IName {
    firstName: string;
    lastName: string;
}


export function generateFullName(input: IName) {
    const name = `${input.firstName} ${input.lastName}`

    return name
}

export function generateSlug(input: string) {
    const slug = slugify(input, {
        lower: true,
        replacement: "-",
        strict: true
    })

    return slug
}
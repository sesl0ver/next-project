export async function responseVerify(data: Response): Promise<any> {
    if (! data.ok) {
        throw new Error(data['message']);
    }
    const result: any = await data.json();
    return result['data'];
}
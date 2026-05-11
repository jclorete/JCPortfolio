export function drivePreviewUrl(id: string): string {
  return `https://drive.google.com/file/d/${id}/preview`;
}

export function driveThumbUrl(id: string): string {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w640`;
}

export function driveViewUrl(id: string): string {
  return `https://drive.google.com/file/d/${id}/view`;
}

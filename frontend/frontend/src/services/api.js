const API_BASE = import.meta.env.VITE_API_BASE;

export async function listUserFiles(token) {
  const res = await fetch(`${API_BASE}/files`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Erro ao obter ficheiros');
  return await res.json(); // [{ fileId, filename, uploadDate, size, mimeType }]
}

// 2. Pede presigned URL para upload
export async function getPresignedUploadUrl(file, token) {
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      filename: file.name,
      mimeType: file.type,
      size: file.size
    })
  });

  if (!res.ok) throw new Error('Erro ao gerar presigned URL');
  return await res.json(); // { url, fileId }
}

// 3. Faz o PUT real para S3 com o presigned URL
export const uploadFileToS3 = (url, file, onProgress, controllerRef) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);

    if (onProgress) {
      xhr.upload.onprogress = onProgress;
    }

    xhr.onload = () => {
      xhr.status === 200 ? resolve() : reject(xhr.statusText);
    };

    xhr.onerror = reject;

    if (controllerRef) controllerRef.current = xhr;

    xhr.send(file);
  });
};


// 4. Apagar ficheiro (do S3 e DynamoDB)
export async function deleteUserFile({ fileId, filename, userId }, token) {
  const res = await fetch(`${API_BASE}/deleteFile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ fileId, filename, userId })
  });

  if (!res.ok) throw new Error('Erro ao apagar ficheiro');
  return await res.json();
}

// 5. Gera presigned URL de download
export async function getPresignedDownloadUrl({ fileId, filename, userId }, token) {
  const res = await fetch(`${API_BASE}/downloadFile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ fileId, filename, userId })
  });

  if (!res.ok) throw new Error('Erro ao obter URL de download');
  const data = await res.json();
  return { url: data.downloadUrl }; // { url }
}

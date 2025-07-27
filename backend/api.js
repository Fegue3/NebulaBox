const API_BASE = import.meta.env.AWS_API_BASE;

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
export async function uploadFileToS3(url, file) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type
    },
    body: file
  });

  if (!res.ok) throw new Error('Erro ao fazer upload para o S3');
  return true;
}

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
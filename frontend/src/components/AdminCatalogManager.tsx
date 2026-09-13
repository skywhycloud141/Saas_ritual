import axios from 'axios';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

type Category = 'monument' | 'fence' | 'vase';

type AdminCatalogManagerProps = {
  token: string;
};

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    return typeof message === 'string' ? message : 'Не удалось добавить объект в каталог.';
  }

  return 'Не удалось добавить объект в каталог.';
}

export function AdminCatalogManager({ token }: AdminCatalogManagerProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('monument');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError('Выберите файл модели в формате .gltf.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const uploadResponse = await axios.post<{ url?: string }>(
        'http://localhost:3000/asset/upload',
        formData,
        config,
      );
      const modelUrl = uploadResponse.data.url;

      if (!modelUrl) {
        throw new Error('Сервер не вернул URL загруженной модели.');
      }

      await axios.post(
        'http://localhost:3000/catalog',
        { name: name.trim(), category, modelUrl },
        config,
      );

      alert('Объект успешно добавлен в каталог!');
      setName('');
      setCategory('monument');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="admin-catalog-manager" onSubmit={handleSubmit}>
      <h2>Добавить 3D-модель</h2>

      <label htmlFor="catalog-model-name">
        Название объекта
        <input
          id="catalog-model-name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label htmlFor="catalog-model-category">
        Категория
        <select
          id="catalog-model-category"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value as Category)}
        >
          <option value="monument">Памятник</option>
          <option value="fence">Ограда</option>
          <option value="vase">Ваза</option>
        </select>
      </label>

      <label htmlFor="catalog-model-file">
        Файл модели (.gltf)
        <input
          ref={fileInputRef}
          id="catalog-model-file"
          name="file"
          type="file"
          accept=".gltf,model/gltf+json"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          required
        />
      </label>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Добавление…' : 'Добавить в каталог'}
      </button>
    </form>
  );
}

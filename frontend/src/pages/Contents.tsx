import { useState } from 'react';
import { Loader, Plus, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import ContentsTable from '../components/content/ContentsTable';
import Layout from '../components/layout';
import Modal from '../components/shared/Modal';
import useAuth from '../hooks/useAuth';
import CreateContentRequest from '../models/content/CreateContentRequest';
import contentService from '../services/ContentService';
import courseService from '../services/CourseService';

export default function Course() {
  const { id } = useParams<{ id: string }>();
  const { authenticatedUser } = useAuth();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addContentShow, setAddContentShow] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const userQuery = useQuery('user', async () => courseService.findOne(id));

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateContentRequest>();

  const { data, isLoading } = useQuery(
    [`contents-${id}`, name, description],
    async () =>
      contentService.findAll(id, {
        name: name || undefined,
        description: description || undefined,
      }),
    {
      refetchInterval: 1000,
    },
  );

  const saveCourse = async (createContentRequest: CreateContentRequest) => {
    try {
      await contentService.save(id, createContentRequest);
      setAddContentShow(false);
      reset();
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Layout>
      <h1 className="font-semibold bg-brandHeaderBackground mx-auto px-5 sm:px-10 py-8 text-3xl">
        {!userQuery.isLoading ? `${userQuery.data.name} Contents` : ''}
      </h1>
      <div className="mx-auto px-5 sm:px-10 pb-10">
        {authenticatedUser.role !== 'user' ? (
          <button
            className="btn bg-primary hover:bg-red-800 my-5 flex gap-2 w-full sm:w-auto justify-center"
            onClick={() => setAddContentShow(true)}
          >
            <Plus /> Add Content
          </button>
        ) : null}

        <div className="table-filter">
          <div className="flex flex-row gap-5">
            <input
              type="text"
              className="input w-1/2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="input w-1/2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <ContentsTable data={data} isLoading={isLoading} courseId={id} />
      </div>

      {/* Add User Modal */}
      <Modal show={addContentShow}>
        <div className="flex">
          <h1 className="font-semibold mb-3">Add Content</h1>
          <button
            className="ml-auto focus:outline-none"
            onClick={() => {
              reset();
              setAddContentShow(false);
            }}
          >
            <X size={30} />
          </button>
        </div>
        <hr />

        <form
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit(saveCourse)}
        >
          <input
            type="text"
            className="input"
            placeholder="Name"
            disabled={isSubmitting}
            required
            {...register('name')}
          />
          <input
            type="text"
            className="input"
            placeholder="Description"
            disabled={isSubmitting}
            required
            {...register('description')}
          />
          <button
            className="btn bg-primary hover:bg-red-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              'Save'
            )}
          </button>
          {error ? (
            <div className="text-red-500 p-3 font-semibold border rounded-md bg-red-50">
              {error}
            </div>
          ) : null}
        </form>
      </Modal>
    </Layout>
  );
}

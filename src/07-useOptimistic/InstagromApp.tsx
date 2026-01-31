import { useOptimistic, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface Comment {
    id: number;
    text: string;
    optimistic?: boolean;
}

let simularError = false;

export const InstagromApp = () => {

    // useTransition: permite hacer transiciones que no bloquean la UI
    // isPending: indica si hay una transición en curso
    // startTransition: acción queinicia una transición
    const [isPending, startTransition] = useTransition();

    const [comments, setComments] = useState<Comment[]>([
        { id: 1, text: '¡Gran foto!' },
        { id: 2, text: 'Me encanta 🧡' },
    ]);

    // useOptimistic: permite marcar ciertas operaciones como optimistas
    // optimisticComments en el html remplaza a comments
    const [optimisticComments, addOptimisticComment] = useOptimistic(comments,
        // funcion reducer que recibe un state y un action que permite generar un nuevo state
        (currentComments, newCommentText: string) => {
            return [
                ...currentComments,
                { id: currentComments[currentComments.length - 1].id + 1, text: newCommentText, optimistic: true },
            ];
        });

    const handleAddComment = async (formData: FormData) => {
        // post-message nombre del input
        const messageText = formData.get('post-message') as string;
        console.log('Nuevo comentario', messageText);

        // Se supone que todo sale bien, por eso se agrega el comentario optimista 
        addOptimisticComment(messageText);

        startTransition(async () => {

            if (!simularError) {
                // simular la petición a un servidor
                await new Promise((resolve) => setTimeout(resolve, 3000));
                //await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));

                // caso resolve
                setComments((prev) => [
                    ...prev,
                    { id: comments[comments.length - 1].id + 1, text: messageText },
                ]);

                console.log({ comments });
                console.log('Mensaje grabado', messageText);
                toast('Comentario grabado, simular error: ' + simularError, {
                    duration: 10_000,
                    description: 'Error al grabar el comentario',
                    position: 'top-right',
                    action: {
                        label: 'Cerrar',
                        onClick: () => {
                            toast.dismiss();
                        }
                    }
                });
                simularError = true;
            } else {
                console.log('Error al grabar el comentario');
                // ! caso reject
                setComments((prev) => prev);

                toast('Error al grabar el comentario, simular error: ' + simularError, {
                    duration: 10_000,
                    description: 'Error al grabar el comentario',
                    position: 'top-right',
                    action: {
                        label: 'Cerrar',
                        onClick: () => {
                            toast.dismiss();
                        }
                    }
                });

                simularError = false;
            }



        });

    };

    return (
        <div className="bg-slate-700 h-screen flex flex-col items-center justify-center">
            {/* Post de ejemplo */}
            <div className="flex flex-col items-center justify-center bg-gray-300 rounded-t-3xl p-4 w-[500px]">
                <img
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop"
                    alt="Instagrom"
                    className="object-cover rounded-xl mb-4"
                />
                <p className="text-black font-bold mb-4">
                    Mira que interesante esta funcionalidad de la API de React.
                </p>
            </div>

            {/* Comentarios */}
            <ul className="flex flex-col items-start justify-center bg-gray-300 w-[500px] p-4">
                {/* {comments.map((comment) => ( */}
                {optimisticComments.map((comment) => (
                    <li key={comment.id} className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                            <span className="text-white text-center">A</span>
                        </div>
                        <p className="text-black">{comment.text}</p>
                        {comment.optimistic && (
                            <span className="text-gray-500 text-sm">enviando... </span>
                        )}
                    </li>
                ))}
            </ul>

            {/* Formulario de comentarios */}
            <form
                action={handleAddComment}
                // action={event => {
                //     handleAddComment(event);
                // }}
                className="flex flex-col items-center justify-center bg-gray-300 w-[500px] rounded-b-3xl p-4"
            >
                <input
                    type="text"
                    name="post-message"
                    placeholder="Escribe un comentario"
                    required
                    className="w-full p-2 rounded-md mb-2 text-black bg-white"
                />
                <button
                    type="submit"
                    // disabled={false}
                    disabled={isPending}
                    className="bg-blue-500 text-white p-2 rounded-md w-full"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, MoreHorizontal, Calendar, MessageSquare } from "lucide-react"
import { useParams } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Task {
  id: string
  title: string
  description?: string
  assignee?: string
  priority: "low" | "medium" | "high"
  dueDate?: string
  tags: string[]
  comments: number
}

interface Column {
  id: string
  title: string
  color: string
  tasks: Task[]
}

export default function StationPage() {
  const params = useParams()
  const stationId = params.id

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
    tags: "",
  })

  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      color: "border-purple-500/30",
      tasks: [
        {
          id: "1",
          title: "Criar campanha Q1",
          description: "Desenvolver estratégia de marketing para o primeiro trimestre",
          assignee: "João Silva",
          priority: "high",
          dueDate: "2024-01-15",
          tags: ["marketing", "urgente"],
          comments: 3,
        },
        {
          id: "2",
          title: "Review do website",
          assignee: "Maria Santos",
          priority: "medium",
          tags: ["design", "web"],
          comments: 1,
        },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      color: "border-cyan-500/30",
      tasks: [
        {
          id: "3",
          title: "Design do logo",
          assignee: "Pedro Costa",
          priority: "high",
          tags: ["design", "branding"],
          comments: 5,
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      color: "border-yellow-500/30",
      tasks: [],
    },
    {
      id: "done",
      title: "Done",
      color: "border-green-500/30",
      tasks: [
        {
          id: "4",
          title: "Pesquisa de mercado",
          assignee: "Ana Lima",
          priority: "low",
          tags: ["pesquisa", "dados"],
          comments: 2,
        },
      ],
    },
  ])

  const [stationName, setStationName] = useState("Marketing Station")

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const sourceColumn = columns.find((col) => col.id === source.droppableId)
    const destColumn = columns.find((col) => col.id === destination.droppableId)

    if (!sourceColumn || !destColumn) return

    const sourceTask = sourceColumn.tasks.find((task) => task.id === draggableId)
    if (!sourceTask) return

    // Remove task from source column
    const newSourceTasks = sourceColumn.tasks.filter((task) => task.id !== draggableId)

    // Add task to destination column
    const newDestTasks = [...destColumn.tasks]
    newDestTasks.splice(destination.index, 0, sourceTask)

    const newColumns = columns.map((col) => {
      if (col.id === source.droppableId) {
        return { ...col, tasks: newSourceTasks }
      }
      if (col.id === destination.droppableId) {
        return { ...col, tasks: newDestTasks }
      }
      return col
    })

    setColumns(newColumns)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleCreateTask = () => {
    if (!newTask.title.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignee: newTask.assignee,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      tags: newTask.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      comments: 0,
    }

    const newColumns = columns.map((col) => {
      if (col.id === "todo") {
        return { ...col, tasks: [...col.tasks, task] }
      }
      return col
    })

    setColumns(newColumns)
    setNewTask({
      title: "",
      description: "",
      assignee: "",
      priority: "medium",
      dueDate: "",
      tags: "",
    })
    setIsNewTaskModalOpen(false)
  }

  return (
    <div className="space-y-6 relative z-10">
      {/* Station Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{stationName}</h1>
          <p className="text-gray-400">Gerencie suas tarefas e projetos</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-purple-500/30 text-purple-300 card-glow">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Membro
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 card-glow"
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </motion.div>

      {/* Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div key={column.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${column.color.replace("border-", "bg-").replace("/30", "")}`}
                    ></div>
                    {column.title}
                    <Badge variant="secondary" className="ml-2 bg-slate-700/50 text-gray-300">
                      {column.tasks.length}
                    </Badge>
                  </h3>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-3 min-h-[200px] p-3 rounded-lg transition-all duration-300 ${
                        snapshot.isDraggingOver ? "drop-zone-active" : "bg-slate-800/20"
                      }`}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`smooth-transition ${snapshot.isDragging ? "card-dragging" : ""}`}
                            >
                              <Card
                                className={`bg-slate-800/60 ${column.color} card-glow cursor-pointer backdrop-blur-sm ${
                                  !snapshot.isDragging ? "hover:bg-slate-800/80" : ""
                                }`}
                                onClick={() => {
                                  if (!snapshot.isDragging) {
                                    setSelectedTask(task)
                                    setIsTaskModalOpen(true)
                                  }
                                }}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <h4 className="font-medium text-white text-sm leading-tight">{task.title}</h4>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-gray-400 hover:text-white h-6 w-6 p-0"
                                    >
                                      <MoreHorizontal className="w-3 h-3" />
                                    </Button>
                                  </div>

                                  {task.description && (
                                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">{task.description}</p>
                                  )}

                                  {task.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                      {task.tags.map((tag) => (
                                        <Badge
                                          key={tag}
                                          variant="secondary"
                                          className="text-xs bg-slate-700/50 text-gray-300"
                                        >
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}

                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <div
                                        className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)} priority-pulse`}
                                      ></div>
                                      {task.assignee && (
                                        <Avatar className="w-6 h-6">
                                          <AvatarFallback className="text-xs bg-slate-700 text-white">
                                            {getInitials(task.assignee)}
                                          </AvatarFallback>
                                        </Avatar>
                                      )}
                                    </div>

                                    <div className="flex items-center space-x-2 text-gray-400">
                                      {task.dueDate && (
                                        <div className="flex items-center">
                                          <Calendar className="w-3 h-3 mr-1" />
                                          <span className="text-xs">
                                            {new Date(task.dueDate).toLocaleDateString("pt-BR", {
                                              day: "2-digit",
                                              month: "2-digit",
                                            })}
                                          </span>
                                        </div>
                                      )}
                                      {task.comments > 0 && (
                                        <div className="flex items-center">
                                          <MessageSquare className="w-3 h-3 mr-1" />
                                          <span className="text-xs">{task.comments}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </motion.div>

      {/* Task Details Modal */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedTask?.title}</DialogTitle>
            <DialogDescription className="text-gray-400">Detalhes da tarefa</DialogDescription>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-300">Descrição</Label>
                <p className="text-gray-300 mt-1">{selectedTask.description || "Sem descrição"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300">Responsável</Label>
                  <p className="text-white mt-1">{selectedTask.assignee || "Não atribuído"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Prioridade</Label>
                  <div className="flex items-center mt-1">
                    <div className={`w-3 h-3 rounded-full mr-2 ${getPriorityColor(selectedTask.priority)}`}></div>
                    <span className="text-white capitalize">{selectedTask.priority}</span>
                  </div>
                </div>
              </div>

              {selectedTask.dueDate && (
                <div>
                  <Label className="text-sm font-medium text-gray-300">Data de Entrega</Label>
                  <p className="text-white mt-1">{new Date(selectedTask.dueDate).toLocaleDateString("pt-BR")}</p>
                </div>
              )}

              {selectedTask.tags.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-300">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedTask.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-slate-700/50 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium text-gray-300">Comentários</Label>
                <p className="text-gray-400 mt-1">{selectedTask.comments} comentários</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Task Modal */}
      <Dialog open={isNewTaskModalOpen} onOpenChange={setIsNewTaskModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Nova Tarefa</DialogTitle>
            <DialogDescription className="text-gray-400">Crie uma nova tarefa para sua station</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-300">
                Título *
              </Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Digite o título da tarefa"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-300">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Descreva a tarefa"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignee" className="text-sm font-medium text-gray-300">
                  Responsável
                </Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, assignee: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Nome do responsável"
                />
              </div>

              <div>
                <Label htmlFor="priority" className="text-sm font-medium text-gray-300">
                  Prioridade
                </Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    setNewTask((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="low" className="text-white">
                      Baixa
                    </SelectItem>
                    <SelectItem value="medium" className="text-white">
                      Média
                    </SelectItem>
                    <SelectItem value="high" className="text-white">
                      Alta
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dueDate" className="text-sm font-medium text-gray-300">
                  Data de Entrega
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="tags" className="text-sm font-medium text-gray-300">
                  Tags (separadas por vírgula)
                </Label>
                <Input
                  id="tags"
                  value={newTask.tags}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, tags: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="design, urgente, marketing"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsNewTaskModalOpen(false)}
                className="border-slate-600 text-gray-300"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateTask}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={!newTask.title.trim()}
              >
                Criar Tarefa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

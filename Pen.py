import turtle 

#Create Pen
class Pen(turtle.Turtle):
    def __init__(self, shape):
        turtle.Turtle.__init__(self)
        self.shape(shape)
        self.color("white")
        self.penup()
        self.speed(0)
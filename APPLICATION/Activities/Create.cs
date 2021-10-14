using DOMAIN;
using MediatR;
using PERSISTANCE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace APPLICATION.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                 _context.Activities.Add(request.activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }

           
        }

    }
}
